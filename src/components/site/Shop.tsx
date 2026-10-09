import Image from "next/image";
import { links, products } from "@/config/site";
import SectionHead from "./SectionHead";

export default function Shop() {
  return (
    <section className="shop" id="shop">
      <div className="wrap">
        <SectionHead
          title="Shop"
          aside={
            <a href={links.shop} target="_blank" rel="noopener noreferrer" className="link-arrow">
              Shop all →
            </a>
          }
        />
        <ul className="shop_grid">
          {products.map((p, i) => (
            <li key={i}>
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="pcard">
                <div className="pcard_img">
                  <Image src={p.image} alt={p.name} fill sizes="(max-width: 700px) 50vw, 25vw" />
                </div>
                <div className="pcard_info">
                  <div>
                    <p className="pcard_name">{p.name}</p>
                    <p className="pcard_price">{p.price}</p>
                  </div>
                  <span className="pcard_plus" aria-hidden="true">+</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
