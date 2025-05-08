import Image from "next/image";

type Props = {
  name: string;
  width: number;
  height: number;
};

export default function Icon({ name, width, height }: Props) {
  const src = `/icons/${name}.svg`;
  return <Image alt={name} width={width} height={height} src={src} />;
}
