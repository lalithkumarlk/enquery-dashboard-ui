import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Home",
        href: "/admin",
        visible: ["admin", "enquire"],
      },
      {
        icon: "/teacher.png",
        label: "Enquires",
        href: "/list/enquires",
        visible: [ "enquire"],
      }
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      }
    ],
  },
];

const Menu = () => {
  return (
    <div className="mt-4 text-sm">
      {
        menuItems.map((i) => (
          <div className="flex flex-col gap-2" key={i.title}>
            <span className="hidden lg:block text-gray-400 font-light my-4">{i.title}</span>
            {
              i.items.map(item => (
                <Link href={item.href} key={item.label} className="flex items-center lg:justify-start gap-4 text-gray-500 py-2">
                <Image src={item.icon} alt="" width={20} height={20}/>
                <span>{item.label}</span>
                </Link>
              ))
            }
            </div>
        ))
      }
    </div>
  )
}

export default Menu;