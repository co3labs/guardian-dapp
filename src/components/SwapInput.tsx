import { BsChevronDown } from 'react-icons/bs'


const SwapInput = ({title}: {title: string}) => {

    return (
        <div className="mt-4 bg-gray-900 p-4 rounded-lg">
        <div className="md:grid md:grid-cols-5">
            <div className="col-span-2 grid grid-flow-col gap-4 justify-start items-center">
                <img src="http://via.placeholder.com/70x70" className="w-16 h-16 rounded-md" alt="" />
                <div role="button" tabIndex={0}>
                    {/* <button> */}
                        <p className="text-xs text-gray-300">{title}</p>
                        <span className="text-2xl text-gray-300 font-bold grid grid-flow-col items-center gap-1">
                            <span>ETH</span>
                            <BsChevronDown size="16" />
                        </span>
                    {/* </button> */}
                </div>
            </div>
            <div className="col-span-3 mt-3 md:mt-0">
                {/* https://stackoverflow.com/a/58097342/6513036 and https://stackoverflow.com/a/62275278/6513036 */}
                <input onWheel={ event => event.currentTarget.blur() } onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()} type="number" className="h-full w-full rounded-lg bg-black text-3xl px-2 outline-none focus:placeholder-gray-200 placeholder-gray-500" placeholder="0.0" />
            </div>
        </div>
    </div>
    )
}

export default SwapInput
