const arr = [
  { value: "abc1", label: "abc" },
  { value: "bcd", label: "bcd" },
  { value: "cde", label: "cde" },
  { value: "def", label: "def" },
  { value: "efg", label: "efg" },
  { value: "fgh", label: "fgh" },
];

export default {
  get: (url: string) => {
    if (url === "fakeUrl.com") {
      return new Promise((resolve, reject) => {
        resolve({ data: arr });
      });
    }
  },
};
