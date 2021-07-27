import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Base } from '../Base';
import { mapData } from '../../api/map-data'
import { PageNotFound } from '../PageNotFound';
import { Loading } from '../Loading';

import { GridTwoColumn } from '../../components/GridTwoColumn';
import { GridContent } from '../../components/GridContent';
import { GridText } from '../../components/GridText';
import { GridImage } from '../../components/GridImage';

import config from '../../config';

export default function Home() {
  const [data, setData] = useState([])

  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname.replace(/[^a-z0-9-_]/gi, '');
    const slug = pathname ? pathname : config.defaultSlug;
    console.log(slug);


    const load = async () => {
      try {
        const data = await fetch(config.url + slug);
        const json = await data.json();
        const pageData = mapData(json);
        setData(pageData[0]);
        console.log(pageData)
      } catch (error) {
        setData(undefined);
        console.log(error)
      }
    }
    load();
  }, [location])

  useEffect(() => {
    if (data === undefined) {
      document.title = `Page not Found | ${config.siteName}`;
    }

    if (data && !data.slug) {
      document.title = `Loading... | ${config.siteName}`;
    }

    if (data && data.title) {
      document.title = `${data.title} | ${config.siteName}`;
    }
  }, [data])

  if (data === undefined) {
    return <PageNotFound />
  }

  if (data && !data.slug) {
    return <Loading />
  }

  const {menu, sections, footerHtml, slug} = data;

  const {links, text, link, srcImg} = menu

  return (
    <Base
      links={links}
      footerHtml={footerHtml}
      logoData={{ text, link, srcImg }}
    >
      {sections.map((section, index) => {
       
        const { component } = section;
        const key = `${slug}-${index}`;

        if (component === 'section.section-two-columns') {
          return <GridTwoColumn key={key} {...section} />;
        }

        if (component === 'section.section-content') {
          return <GridContent key={key} {...section} />;
        }

        if (component === 'section.section-grid-text') {
          return <GridText key={key} {...section} />;
        }

        if (component === 'section.section-grid-image') {
          return <GridImage key={key} {...section} />;
        }

        return <h1>Erro</h1>
      })}
    </Base>
  );
}