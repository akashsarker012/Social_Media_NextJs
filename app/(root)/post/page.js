import Link from "next/link";

async function getData() {
  const res = await fetch('http://localhost:8000/api/v1/getallpost')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
 
export default async function Page() {
  const data = await getData()
  console.log(data);
 
  return <main>
    {data.map(post => 
    <>
    <p key={post.id}>{post.title}</p>
    <Link href={`/post/${post._id}`} key={post.id}>{post._id}</Link>
    
    </>
    
    )}
  </main>
}