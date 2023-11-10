import Link from 'next/link'
import { FooterLinksOne, FooterLinksTwo, FooterLinksThree } from '@/constants/footer'
import {Twitter, Twitch, Github, Linkedin } from "lucide-react"

const Links = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-start gap-10 lg:gap-20">
      <div className="flex flex-col  gap-4">
        {FooterLinksOne.map((link, index) => (
          <Link
            href={link.name}
            key={index}
            className="text-sm text-paragraph hover:text-primary custom-hover"
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {FooterLinksTwo.map((link, index) => (
          <Link
            href={link.name}
            key={index}
            className="text-sm text-paragraph  custom-hover hover:text-primary"
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {FooterLinksThree.map((link, index) => (
          <Link
            href={link.name}
            key={index}
            className="text-sm text-paragraph hover:text-primary custom-hover"
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex flex-col items-start gap-4">
        <div className="flex items-center gap-2">
          <Twitter className="text-paragraph" size={18} />
          <Link
            href="/"
            className="text-sm text-paragraph hover:text-primary custom-hover"
          >
            Twitter
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Twitch className="text-paragraph" size={18} />
          <Link
            href="/"
            className="text-sm text-paragraph hover:text-primary custom-hover"
          >
            Twitch
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Github className="text-paragraph" size={18} />
          <Link
            href="/"
            className="text-sm text-paragraph hover:text-primary custom-hover"
          >
            Github
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Linkedin className="text-paragraph" size={18} />
          <Link
            href="/"
            className="text-sm text-paragraph hover:text-primary custom-hover"
          >
            Linkedin
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Links