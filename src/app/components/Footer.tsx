import { motion } from "framer-motion";
import { FiHeart } from "react-icons/fi";
import { LinkPreview } from "./ui/link-preview";

const Footer = () => {
  return (
    <footer className="mt-12">
      <p className="flex items-center justify-center leading-loose tracking-wide text-center text-zinc-400">
        Feito com{" "}
        <motion.span
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.7}
          className="mx-1"
        >
          <FiHeart className="text-lime-500 cursor-grab hover:fill-red-500" />
        </motion.span>{" "}
        por{" "}
        <LinkPreview
          url="https://github.com/Amadeo-Frontend/"
          className="mx-1 text-lime-500 hover:underline hover:text-lime-400"
        >
          AmadeoBon
        </LinkPreview>
      </p>
    </footer>
  );
};
export default Footer;
