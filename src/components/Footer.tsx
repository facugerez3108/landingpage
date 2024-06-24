import { FooterItems } from "../data"

const Footer = () => {
    return (
        <footer className="mt-20 border-t py-10 border-neutral-700">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col lg:flex-row justify-between items-center">
                    <ul className="flex space-x-12">
                        {
                            FooterItems.map((item, index) => (
                                <li key={index}>
                                    <a href={item.href}>{item.label}</a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;