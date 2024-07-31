import Image from "next/image";

interface LandingTopCardProp {
  imagePath: string;
  title: string;
  descriptioin: string;
}
export function LandingTopCard({
  imagePath,
  title,
  descriptioin,
}: LandingTopCardProp) {
  return (
    <div className="flex w-full h-32 rounded-sm bg-white px-3 gap-3">
      <div className="h-full flex items-center">
        <Image draggable={false} src={imagePath} alt="" height={108} width={108} />
      </div>
      <div className="w-full h-full pt-5 flex flex-col gap-1">
        <h1 className="font-semibold">{title}</h1>
        <p className="text-[15px] font-[400] text-[#868686]">{descriptioin}</p>
      </div>
      
    </div>
  );
}
