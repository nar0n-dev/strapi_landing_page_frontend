import { Footer } from '.';

export default {
  title: 'Footer',
  component: Footer,
  args: {
    html: `<p><a target="_blank" href="https://beacons.page/otaviomiranda">Feito com <span class="heart">❤</span> por Otávio Miranda</a></p>`,
  },
};

export const Template = (args) => {
  return (
    <div>
      <Footer {...args} />
    </div>
  );
};