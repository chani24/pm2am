const gallery = [
  {
    image: "",
    span: 3,
    eventImage: "",
    venue: "VODA BEACH CLUB",
    location: "LAGOS",
    buttonLink:
      "https://tix.africa/discover/palmwine2am-with-the-outsiders-the-beach-carnival-5bd70329-6602-4940-8263-19b2b1d859b5",
    buttonText: "BUY TICKETS",
  },
];

export default function Gallery() {
  return (
    <div className="grid">
      {gallery.map((item, index) => {
        return <div key={index}></div>;
      })}
    </div>
  );
}
