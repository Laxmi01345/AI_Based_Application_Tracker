import react from 'react'

const Form =()=>{

    return (
        <>
            <div>
               
               <h1 className='text-4xl p-2'>Job Application Form</h1>

                <div className='m-4'>
                    <button className='bg-green-400 p-2 font-bold rounded-md'>Create</button>

                    <div className='border-1 border-black p-4 m-4 mx-80 rounded-md font-black bg-blue-200'>
                        <div className='p-2'>
                        <label> Company Name : </label>
                        <input type="text" />
                        </div>
                        <div className='p-2'>
                        <label> Role : </label>
                        <input type="text" />
                        </div>

                        <button className='p-2 bg-red-400 rounded-md'>Add</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Form