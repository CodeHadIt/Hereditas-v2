import { redirect } from 'next/navigation'
const Apppage = () => {
  
  redirect("/app/dashboard/home")  
  return null;
}

export default Apppage