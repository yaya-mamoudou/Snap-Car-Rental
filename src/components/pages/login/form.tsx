'use client'
import Link from 'next/link';
import { FormEvent } from 'react';
import Button from '~/components/common/button';
import Input from '~/components/common/input';

export default function LoginForm() {
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
            <Input
                label="Username"
                labelPlacement="outside"
                placeholder="Enter username"
                variant="bordered"
                name="username"
                required
            />

            <Input
                label="Password"
                labelPlacement="outside"
                placeholder="✹✹✹✹✹✹✹✹✹✹✹✹"
                variant="bordered"
                name="password"
                type="password"
                required
            />

            <Button className="mt-6 font-semibold" type="submit">Login</Button>

            <div className="text-sm mt-4">Don't have an account? <Link href="/register" className="text-primary font-semibold">Register</Link></div>
        </form>
    )
}
