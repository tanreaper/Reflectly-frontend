"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

interface SignInModalProps {
    isOpen: boolean;
    onClose: () => void
}

export default function SignInModal({ isOpen, onClose }: Readonly<SignInModalProps>) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLogin, setIsLogin] = useState(true);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const endpoint = isLogin ? "login" : "signup";
        const payload = isLogin ? { email, password } : { email, password, username, firstName, lastName };
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${endpoint}`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (res.ok) {
                onClose();
            } else {
                alert(data.error ?? "Something went wrong")
            }
        } catch (error) {
            console.error("Request failed due to network or unexpected error:", error);
            alert("Something went wrong. Please check your network connection.");
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md rounded-2xl shadow-xl p-6 space-y-6">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold text-center">
                        {isLogin ? "Sign In" : "Sign Up"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full border px-3 py-2"
                                required
                            />
                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full border px-3 py-2"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full border px-3 py-2"
                                required
                            />
                        </>
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border px-3 py-2 rounded-md"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border px-3 py-2 rounded-md"
                        required
                    />
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                        {isLogin ? "Sign In" : "Sign Up"}
                    </button>
                </form>
                <p className="text-sm text-center pt-2">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "} 
                    <button className="text-blue-600 cursor-pointer" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Sign Up" : "Sign In"}
                    </button>
                </p>
            </DialogContent>
        </Dialog>
    );
}