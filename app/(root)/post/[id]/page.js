import getAllPost from "@/lib/getAllPost";

export default async function Page({ params }) {
  try {
    const { id } = params;
    const post = await getAllPost();
    // console.log(post);

    const data = post.filter((post) => post._id === id);
    // console.log(data);

    return (
      <div className="container mx-auto px-4 py-8">
        {data.length > 0 ? (
          <article className="shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold">{data[0].title}</h2>
            </div>
          </article>
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    );
  } catch (error) {
    console.error(error);
    // Handle the error gracefully
  }
}
