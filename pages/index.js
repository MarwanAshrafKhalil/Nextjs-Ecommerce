import Layout from "@/components/Layout";
import Nav from "@/components/Nav";
import { useSession} from "next-auth/react"

export default function Home() {
  const { data: session } = useSession();
  
  return(
    
    <Layout>
      <div className="text-blue-900 flex justify-between">
        <h2 className="p-2">Hello, <b> {session?.user?.name} </b></h2>

        <div className="bg-gray-300 flex text-black rounded-lg overflow-hidden gap-1 items-center">

          <img src={session?.user?.image} alt="user" className="w-8 h-8 rounded-lg " />

          <span className="px-2 py-2">{session?.user?.name}
          </span>
        </div>

      </div>
    </Layout>
    
  )
}
