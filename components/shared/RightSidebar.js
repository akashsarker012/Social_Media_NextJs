import UserCard from "../cards/UserCard";

async function RightSidebar() {
  // Example list of communities (replace with your actual data)
  const communities = [
    {
      id: 1,
      name: "Community 1",
      username: "comm1user",
      image: "community1.jpg",
    },
    {
      id: 2,
      name: "Community 2",
      username: "comm2user",
      image: "community2.jpg",
    },
    // Add more community objects as needed
  ];

  return (
    <section className='custom-scrollbar rightsidebar'>
      <div className='flex flex-1 flex-col justify-start'>
        <h3 className='text-heading4-medium text-light-1'>
          Suggested Communities
        </h3>

        <div className='mt-7 flex w-[350px] flex-col gap-9'>
          {communities.length > 0 ? (
            communities.map((community) => (
              <UserCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                personType='Community'
              />
            ))
          ) : (
            <p className='!text-base-regular text-light-3'>
              No communities yet
            </p>
          )}
        </div>
      </div>

      <div className='flex flex-1 flex-col justify-start'>
        <h3 className='text-heading4-medium text-light-1'>Similar Minds</h3>
        {/* 
        <div className='mt-7 flex w-[350px] flex-col gap-10'>
          {similarMinds.users.length > 0 ? (
            <>
              {similarMinds.users.map((person) => (
                <UserCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  username={person.username}
                  imgUrl={person.image}
                  personType='User'
                />
              ))}
            </>
          ) : (
            <p className='!text-base-regular text-light-3'>No users yet</p>
          )}
        </div> 
        */}
      </div>
    </section>
  );
}

export default RightSidebar;
