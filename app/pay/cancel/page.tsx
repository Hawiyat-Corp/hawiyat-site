import Image from 'next/image';
import { Ban } from 'lucide-react';


export default function Page() {


    return (
        <>

            <div className="min-h-screen w-screen flex justify-center items-center px-4 sm:px-6 lg:px-8 py-8">
                {/* Background Images - Responsive */}
                <Image
                    className="fixed top-0 z-[-1] w-full h-full object-cover"
                    width={1920}
                    height={1080}
                    src="/curtains-bg.svg"
                    alt="Curtains Background effect"
                    priority
                />
                <Image
                    className="fixed top-0 z-[-1] w-full h-full object-cover"
                    width={1920}
                    height={1080}
                    src="/grid-mesh.svg"
                    alt="Grid mesh background"
                />

                {/* Main Card Container */}
                <div className="min-w-full flex flex-col items-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl z-10">

                    {/* Title - Responsive */}
                    <h1 className="text-4xl lg:text-5xl font-normal 
                        bg-gradient-to-b from-[rgba(255,255,255,1)] 
                        to-[#1d1818] bg-clip-text text-transparent
                        mb-8 sm:mb-10 md:mb-12 text-center leading-tight">
                        Checkout
                    </h1>




                    <div className=" w-full md:w-3/4  rounded-3xl
                          flex justify-center items-center
                          wrap">

                        <div className='flex flex-col md:flex-row md:justify-evenly items-center my-10 gap-4 bg-geen-500'>
                            <Ban size={48} className='text-red-500' /> <div className='text-2xl md:text-3xl'>Payment Was Canceled</div>
                        </div>
                    </div>

                    {/* Additional Mobile Spacing */}
                    <div className="h-8 sm:h-0"></div>
                </div>
            </div>
        </>
    );
}