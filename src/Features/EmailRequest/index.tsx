import React from 'react'
import { EmailRequestShipAsync } from '../../Apis/Emails/REmail'
import Table from '../../Components/Table'
import { emailRequestCtx } from '../../Store/emailRequest.context'
import TableEmailRequest from './Components/TableEmailRequest'
interface Props {

}

const EmailRequest = (props: Props) => {

  
  return (
    <div className="mt-5">
      <TableEmailRequest />
    </div>
  )
}

export default EmailRequest
