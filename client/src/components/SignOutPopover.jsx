import React, { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ReactComponent as MoreLogo } from '../assets/more.svg'

const SignOutPopover = ({ logout }) => {
  return (
    <div className="absolute inset-x-56 mt-3">
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`
              ${open ? '' : 'text-opacity-80'}
              group-hover:text-sky-600 inline-flex hover:text-opacity-100`}
            >
              <MoreLogo className='w-6 h-6 rounded-full p-1 fill-neutral-600 cursor-pointer hover:bg-gray-200' />
              {/* <MoreLogo className='absolute inset-x-56 w-6 h-6 mt-1 rounded-full p-1 fill-neutral-600 cursor-pointer hover:bg-gray-200' onClick={() => logout()} /> */}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                className="absolute z-10 mt-3  font-semibold w-max -translate-x-8 -translate-y-3 bg-neutral-200 rounded py-1 px-4 transform lg:max-w-3xl hover:bg-neutral-400 cursor-pointer"
                onClick={() => logout()}
              >
                <div className="relative">
                  Sign out
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}

export default SignOutPopover