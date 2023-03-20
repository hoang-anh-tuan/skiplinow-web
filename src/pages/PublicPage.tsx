import React from 'react'
import { useAuth } from '../App'
import TableActions from '../components/Table/Actions'
import debounce from 'lodash.debounce'
import { ServiceApi } from '../services/Api'
import Table from '../components/Table'
import useMergingState from '../hooks/useMergingState'

function PublicPage() {
  let auth = useAuth()

  // We'll start our table without any data
  const [data, setData] = React.useState([])
  const [tableData, setTableData] = useMergingState({
    pageIndex: 0,
    pageSize: 10,
    pageCount: 0,
    loading: false
  })
  const [searchValue, setSearchValue] = React.useState('')
  const onSearch = debounce((value: any) => {
    setSearchValue(value?.target?.value)
  }, 500)

  const fetchData = React.useCallback(
    async ({
      pageIndex,
      pageSize,
      newSearchValue
    }: {
      pageIndex: number
      pageSize: number
      newSearchValue?: string
    }) => {
      if (!newSearchValue) {
        setData([])
        setTableData({ pageCount: 0 })
        return
      }
      setTableData({ pageIndex, pageSize, loading: true })
      const res: any = await ServiceApi.searchGithubUsers({
        query: newSearchValue,
        page: pageIndex,
        per_page: pageSize
      })

      setData(res.data?.data?.users || [])

      setTableData({
        pageCount: Math.ceil(res.data?.data?.count! / pageSize),
        loading: false
      })
    },
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'Index',
        accessor: (_row: any, i: number) =>
          tableData.pageIndex * tableData.pageSize + i + 1,
        center: true
      },
      {
        Header: 'ID',
        accessor: 'id',
        center: true
      },
      {
        Header: 'Login',
        accessor: 'login',
        center: true
      },
      {
        Header: 'Avatar',
        accessor: 'avatar_url',
        center: true
      },
      {
        Header: 'Url',
        accessor: 'html_url',
        center: true
      },
      // {
      //   Header: 'public_repos',
      //   accessor: 'public_repos',
      //   center: true
      // },
      // {
      //   Header: 'followers',
      //   accessor: 'followers',
      //   center: true
      // },
      {
        Header: 'Actions',
        Cell: <TableActions />,
        center: true
      }
    ],
    [tableData]
  )

  return (
    <div className="bg-default w-screen h-screen text-white overflow-y-scroll">
      <div className=" bg-black2">
        <div className="h-[90px] w-full flex items-center px-6 flex-row justify-between">
          <div className="relative row">
            <input
              onChange={onSearch}
              className="h-[42px] w-[490px] rounded-[30px] bg-black3 px-4"
              placeholder="Search Github Users"
            />
            <div className="absolute right-3">{/* <SearchIcon /> */}</div>
          </div>
          <div className="gap-3 row">
            <div className="w-8 h-8 rounded-full bg-gray"></div>
            <p>{auth?.user}</p>
          </div>
        </div>
      </div>
      <div className="container my-5">
        <Table
          columns={columns}
          data={data}
          fetchData={fetchData}
          loading={tableData.loading}
          pageCount={tableData.pageCount}
          pageSize={100}
          searchValue={searchValue}
        />
      </div>
    </div>
  )
}

export default PublicPage
