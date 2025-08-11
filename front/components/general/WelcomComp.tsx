import Image from 'next/image';
import React from 'react'

type Props = {
    name?: string;
    email?: string;
    avatarUrl?: string;
}

export default function WelcomComp({ name, email, avatarUrl }: Props) {
  return (
    <header className="flex justify-between items-center bg-white p-4 rounded shadow">
          <div>
            <h1 className="text-2xl font-bold">Welcome, {name}</h1>
            <p className="text-sm text-gray-500">Signed in as {email}</p>
          </div>
          <div className="flex items-center gap-4">
            <Image
              unoptimized 
              width={40}
              height={40}
              src={avatarUrl || "https://i.pravatar.cc/40"}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>
  )
}