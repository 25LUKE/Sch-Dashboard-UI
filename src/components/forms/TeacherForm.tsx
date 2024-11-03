"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

//Creating Schema
const schema = z.object({
    userName: z.string()
        .min(3, { message: 'Username must be at least 3 characters long!' })
        .max(20, { message: 'Username must be at most 20 characters long!' }),
    email: z.string().email({message: 'Invalid email address'}),
    password: z.string().min(8,{message: 'Password must be at least 8 character long!'}),
    firstName: z.string().min(1,{message: 'First name is required'}),
    lastName: z.string().min(1,{message: 'Last name is required'}),
    phoneNumber: z.string().min(1,{message: 'Phone is required'}),
    address: z.string().min(1,{message: 'Address is required'}),
    bloodType: z.string().min(1,{message: 'Blood Type is required'}),
    birthday: z.date({message: 'Birthday is required'}),
    sex: z.enum(["male", "female"], {message: 'Sex is required'}),
    img: z.instanceof(File, {message: 'Image is required'}),
  });

  type Inputs = z.infer<typeof schema>

const TeacherForm = ({
    type, 
    data,
}: {
    type: "Create" | "Update";
    data?: any;
}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<Inputs>({
        resolver: zodResolver(schema)
    });

    const onSubmit = handleSubmit((data) => {
        console.log(data)
    })
  return (
    <form className='flex flex-col gap-8' onSubmit={onSubmit}>
        <h1 className="text-xl font-semibold">Create a new teacher</h1>
        <span className="text-xs text-gray-400 font-medium">Authentication Information</span>
        <div className="flex justify-between flex-wrap gap-4">
            <InputField 
                label="UserName" 
                name="userName"
                defaultValue={data?.userName} 
                register={register} 
                error={errors.userName}
            />
            <InputField 
                label="Email" 
                name="email" 
                defaultValue={data?.email} 
                register={register} 
                error={errors.email}
            />
            <InputField 
                label="Password" 
                name="password"
                type="password" 
                defaultValue={data?.password} 
                register={register} 
                error={errors.password}
            />
        </div>
            <span className="text-xs text-gray-400 font-medium">Personal Information</span>
        <div className="flex justify-between flex-wrap gap-4">
            <InputField
                label="First Name"
                name="firstName"
                defaultValue={data?.firstName}
                register={register}
                error={errors.firstName}
            />
            <InputField
                label="Last Name"
                name="lastName"
                defaultValue={data?.lastName}
                register={register}
                error={errors.firstName}
            />
            <InputField
                label="Phone Number"
                name="phoneNumber"
                defaultValue={data?.phoneNumber}
                register={register}
                error={errors.phoneNumber}
            />
            <InputField
                label="Address"
                name="address"
                defaultValue={data?.address}
                register={register}
                error={errors.address}
            />
            <InputField
                label="Blood Type"
                name="bloodType"
                defaultValue={data?.bloodType}
                register={register}
                error={errors.bloodType}
            />
            <InputField
                label="Birth Day"
                name="birthday"
                defaultValue={data?.birthday}
                register={register}
                error={errors.birthday}
                type="date"
            />
            <div className="flex flex-col gap-2 w-full md:w-1/4">
                <label className="text-sm text-gray-400">Sex</label>
                <select className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"{...register("sex")} defaultValue={data?.sex}>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                {errors.sex && <p className="text-xs text-red-500">{errors.sex.toString()}</p>}
            </div>
            <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
                <label className="text-sm text-gray-500 flex items-center gap-2 cursor-pointer" htmlFor="img">
                    <Image src="/upload.png" alt="" width={28} height={28}/>
                    <span>Upload an Image</span>
                </label>
                <input type="file" id="img" {...register("img")} className="hidden" />
                {errors.img && <p className="text-xs text-red-500">{errors.img.toString()}</p>}
            </div>
        </div>
        <button className="bg-blue-400 text-white p-2 rounded-md">{type === "Create" ? "Create" : "Update"}</button>
    </form>
  )
}

export default TeacherForm