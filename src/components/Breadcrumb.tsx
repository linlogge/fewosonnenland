import { FC } from "react";

interface BreadcrumbProps {
  title: string;
  url: string;
  subtitle?: string;
}

const Breadcrumb: FC<BreadcrumbProps> = ({ title, subtitle, url }) => {
  return (
    <section id="breadcrumb-section" data-bg-img={url}>
      <div className="inner-container container">
        <div className="ravis-title">
          <div className="inner-box">
            {title && <div className="title">{title}</div>}
            {subtitle && <div className="sub-title">{subtitle}</div>}
          </div>
        </div>

        <div className="breadcrumb">
          <ul className="list-inline">
            <li>
              <a href="/">Home</a>
            </li>
            <li className="current">
              <a href="#">{title}</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;