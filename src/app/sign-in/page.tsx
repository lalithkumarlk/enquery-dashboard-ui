import { redirect } from "next/navigation"

const LoginPage = () => {
    redirect(`/admin`)
    return (
      <div className=''>LoginPage</div>
    )
  }
  
  export default LoginPage