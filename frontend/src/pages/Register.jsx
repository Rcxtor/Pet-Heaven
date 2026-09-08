import { useState } from "react";
import { registerUser } from "../services/userService";
import { useNavigate } from "react-router-dom";

export default function Register(){
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const data = await registerUser({
                name,
                email,
                password,
            });

            console.log(data);
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    };
    return(
        <div className="flex items-center justify-center">
            <div className="flex flex-col border-2 rounded-lg border-gray-300 min-h-140 mt-10 mb-20 p-10 w-[20%]">
                <div>
                      <h1>Register</h1>
                      <form onSubmit={handleSubmit}>

                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <br /><br />

                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <br /><br />

                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <br /><br />

                            <button className="border-2 cursor-grab" type="submit">
                                Register
                            </button>

                        </form>
                </div>
            </div>
        </div>
    );
}