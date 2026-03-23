// "use client"
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { ModeToggle } from './ModeToggle'
import { checkUser } from '@/lib/checkUser'

const Header = async() => {
  await checkUser()
  return (
    <header className='fixed top-0 w-full border-b bg-background/30 dark:bg-background/0 backdrop-blur-md z-10'>
        <nav className='container mx-auto px-4 h-16 flex items-center justify-between'>
            <Link href={"/"}>
                <Image src="/logo-single.png" alt="medimeet logo" height={60} width={200} className='h-10 w-auto object-contain' loading="eager"/>
            </Link>
            <div className='flex items-center space-x-4'>
                <Show when="signed-out">
              <SignInButton>
                <Button variant='outlined'>Sign In</Button>
              </SignInButton>
              <SignUpButton>
                <Button variant='secondary'>
                  Sign Up
                </Button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
            <ModeToggle/>
            </div>
        </nav>
    </header>
  )
}

export default Header