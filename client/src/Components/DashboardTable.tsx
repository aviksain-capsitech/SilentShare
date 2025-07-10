import React, { useEffect, useState } from 'react';
import type { GetProp, TableProps } from 'antd';
import { Button, message, Modal, Popconfirm, Skeleton, Space, Table } from 'antd';
import type { AnyObject } from 'antd/es/_util/type';
import type { SorterResult } from 'antd/es/table/interface';
import { deleteMessageApi } from '../Apis/message';
import { deleteMessage as deleteMessageRedux, saveMessages as saveMessagesRedux } from "../Redux/Slices/messageSlice";
import { useDispatch } from 'react-redux';
import { axiosInstance } from '../Helper/axiosInstance';

type ColumnsType<T extends object = object> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface DataType {
    name: string;
    gender: string;
    email: string;
    id: string;
}

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: SorterResult<any>['field'];
    sortOrder?: SorterResult<any>['order'];
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const formatDate = (input: string) => {
    const date = new Date(input);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

// creates a URL of params using key and value 
const toURLSearchParams = <T extends AnyObject>(record: T) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(record)) {
        params.append(key, value);
    }
    return params;
};

// returns a object with the page, pagesize, sortType, sortBy etc
const getRandomuserParams = (params: TableParams) => {
    const { pagination, filters, sortField, sortOrder, ...restParams } = params;
    const result: Record<string, any> = {};

    // inserted the pagesize and current page values in the object
    result.page = pagination?.current;
    result.pageSize = pagination?.pageSize;

    // if there is any filter then add it in the result value 
    if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                result[key] = value;
            }
        });
    }

    // if there is any sortField then add it in the result value
    if (sortField) {
        result.orderby = sortField;
        result.order = sortOrder === 'ascend' ? 'asc' : 'desc';
    }

    // if there is any other params then also add that in the result array
    Object.entries(restParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            result[key] = value;
        }
    });

    return result;
};

const DashboardTable: React.FC = () => {
    const [data, setData] = useState<DataType[]>();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 6,
        },
    });

    const [selectedMessage, setSelectedMessage] = useState<any>(null);
    const [showModel, setShowModel] = useState(false);
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();

    const columns: ColumnsType<DataType> = [
        {
            title: 'Message',
            dataIndex: 'content',
            width: '40%',
        },
        {
            title: 'Date',
            dataIndex: 'updatedAt',
            // sorter: true,
            width: '30%',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, msg: any) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => {
                        setSelectedMessage(msg);
                        setShowModel(true);
                    }}>View</Button>
                    <Popconfirm
                        title="Delete the message"
                        description="Are you sure to delete this message?"
                        onConfirm={async () => {
                            await deleteMessageApi(msg?.id);
                            dispatch(deleteMessageRedux(msg?.id));

                            messageApi.open({
                                type: "success",
                                content: "Message Deleted Successfully",
                                duration: 3
                            });
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const fetchData = async () => {
        setLoading(true);

        const queryParams = toURLSearchParams(getRandomuserParams(tableParams));
        const url = `${import.meta.env.VITE_BACKEND_URL}message/get-all?${queryParams.toString()}`;

        try {
            const res: any = await axiosInstance.get(url);

            const items = res?.data?.data?.items || [];
            const total = res?.data?.data?.totalCount || 0;


            dispatch(saveMessagesRedux(items));

            setData(items.map((item: any) => ({
                ...item,
                updatedAt: formatDate(item.updatedAt)
            })));

            setTableParams((prev) => ({
                ...prev,
                pagination: {
                    ...prev.pagination,
                    total,
                },
            }));
        } catch (err) {
            console.error("Error fetching messages:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData() }, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
        tableParams?.sortOrder,
        tableParams?.sortField,
        JSON.stringify(tableParams.filters),
    ]);


    // changes the table params like pagination, filters, sortOrder, sortField set the data
    const handleTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
            sortField: Array.isArray(sorter) ? undefined : sorter.field,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    return (
        <>
            {contextHolder}
            <Modal
                open={showModel}
                onCancel={() => {

                    setShowModel(false);
                    setSelectedMessage(null);

                    if (showModel) {
                        const timer = setTimeout(() => {
                            setShowModel(false);
                        }, 10000);

                        return () => clearTimeout(timer);
                    }

                }}
                centered
                footer={<></>}
            >
                <p><b>Message:</b> {selectedMessage?.content}</p>
            </Modal>

            {loading ? (
                <Skeleton
                    active
                    paragraph={{ rows: 8 }}
                    title={false}
                    style={{ padding: 24 }}
                />
            ) : (
                <Table<DataType>
                    columns={columns}
                    rowKey={(record) => record.id}
                    dataSource={data}
                    pagination={tableParams.pagination}
                    onChange={handleTableChange}
                />
            )}
        </>

    );
};

export default DashboardTable;