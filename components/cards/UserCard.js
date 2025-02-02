"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
function UserCard() {
  const router = useRouter();
  const imgUrl = "https://i.pravatar.cc/300?img=32";

  return (
    <article className='user-card'>
      <div className='user-card_avatar'>
        <div className='relative h-12 w-12'>
          <Image
            src={imgUrl}
            alt='user_logo'
            fill
            className='rounded-full object-cover'
          />
        </div>

        <div className='flex-1 text-ellipsis'>
          <h4 className='text-base-semibold text-light-1'>name</h4>
          <p className='text-small-medium text-gray-1'>username</p>
        </div>
      </div>

      <button className='user-card_btn' >
        View
      </button>
    </article>
  );
}

export default UserCard;