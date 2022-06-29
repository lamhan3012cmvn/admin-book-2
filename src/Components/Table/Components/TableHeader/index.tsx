import React from 'react'

const TableHeader = ({ heads }: { heads: Array<string> }) => {
  return (
    <thead>
      <tr>
        {heads.map(e =>
          <th className="px-4 py-2 border-r" key={e}>{e}</th>
        )}
        <th className="px-4 py-2 border-r" key={"action"}>{"Actions"}</th>
      </tr>
    </thead>
  )
}

export default TableHeader
