type data = { [key: string]: string } | undefined;

const customStyle = (data: data, styles: CSSModuleClasses[string]) => {
   if (data) {
      const container = document.querySelector(`.${styles}`) as HTMLElement;

      Object.keys(data).map((key) => {
         // @ts-expect-error : key in style[key] should be a number
         container.style[key] = data[key];
      });
   }
};

export default customStyle;
