'use client'
import { Radio, RadioGroup } from '@nextui-org/react';
import Link from 'next/link';
import { FormEvent } from 'react';
import Button from '~/components/common/button';
import Input from '~/components/common/input';
import Upload from '~/components/common/upload';

export default function RegisterForm() {
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        console.log(data);

        // const res = await fetch('/api/submit-form', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        // });

        // if (res.ok) {
        //     console.log('Form submitted successfully');
        // } else {
        //     console.error('Form submission failed');
        // }
    };
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">

            <div className="grid grid-cols-12 gap-x-0 md:gap-x-4 gap-y-4">
                <div className="col-span-12 md:col-span-6">
                    <Input
                        label="Full Name"
                        labelPlacement="outside"
                        placeholder="Enter full name"
                        variant="bordered"
                        name="fullname"
                        required
                        isRequired
                    />
                </div>
                <div className="col-span-12 md:col-span-6">
                    <Input
                        label="Phone Number"
                        labelPlacement="outside"
                        placeholder="Enter phone number"
                        variant="bordered"
                        name="phone"
                        type="number"
                        required
                        isRequired
                    />
                </div>
                <div className="col-span-12 md:col-span-6">
                    <Input
                        label="Username"
                        labelPlacement="outside"
                        placeholder="Enter username"
                        variant="bordered"
                        name="username"
                        required
                        isRequired
                    />
                </div>
                <div className="col-span-12 md:col-span-6">
                    <Input
                        label="Email"
                        labelPlacement="outside"
                        placeholder="Enter email"
                        type='email'
                        variant="bordered"
                        name="email"
                        required
                        isRequired
                    />

                </div>
                <div className="col-span-12 md:col-span-6">
                    <Input
                        label="Password"
                        labelPlacement="outside"
                        placeholder="✹✹✹✹✹✹✹✹✹✹✹✹"
                        variant="bordered"
                        name="password"
                        type="password"
                        required
                        isRequired
                    />
                </div>
                <div className="col-span-12 md:col-span-6">
                    <Input
                        label="Confirm Password"
                        labelPlacement="outside"
                        placeholder="✹✹✹✹✹✹✹✹✹✹✹✹"
                        variant="bordered"
                        name="password_confirmation"
                        type="password"
                        isRequired
                        required
                    />
                </div>

                <div className="col-span-12">
                    <RadioGroup classNames={{ label: 'text-sm text-black', }} name='gender' aria-label='gender' label="Gender" isRequired className='*:flex-row *:gap-x-4 *:text-sm'>
                        <Radio classNames={{ label: 'text-sm' }} value="male" >Male</Radio>
                        <Radio classNames={{ label: 'text-sm' }} value="female" >Female</Radio>
                        <Radio classNames={{ label: 'text-sm' }} value="other" >Other</Radio>
                    </RadioGroup>
                </div>

                <div className='col-span-12 md:col-span-6'>
                    <Upload accept='image/*,.pdf' required label="Upload Driver's Lisence" />
                </div>

                <div className='col-span-12 md:col-span-6'>
                    <Upload accept='image/*,.pdf' required label="Upload Insurance" />
                </div>
            </div>

            <Button className="mt-6 font-semibold" type="submit">Register</Button>

            <div className="text-sm mt-4">Already have an account? <Link href="/login" className="text-primary font-semibold">Login</Link></div>
        </form>
    )
}

