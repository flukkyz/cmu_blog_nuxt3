import { useDayjs } from "#dayjs"; // not need if you are using auto import
const dayjs = useDayjs();
export type DateTimeStyle = "shortest" | "short" | "medium" | "long" | "full";

export default {
  dt: (date?: Date | string) => {
    return dayjs(date);
  },
  toText: (
    date: Date,
    dateStyle?: DateTimeStyle | null,
    timeStyle?: DateTimeStyle | null
  ) => {
    const dateTimeFormat = {
      th: {
        merge: "",
        date: {
          shortest: "D/M/BB",
          short: "D/M/BBBB",
          medium: "D MMM BBBB",
          long: "D MMMM BBBB",
          full: "วันddddที่ D MMMM พ.ศ. BBBB",
        },
        time: {
          shortest: "H:mm",
          short: "HH:mm",
          medium: "HH.mm น.",
          long: "HH:mm:ss",
          full: "HH นาฬิกา mm นาที ss วินาที",
        },
      },
      en: {
        merge: "at",
        date: {
          shortest: "M/D/YY",
          short: "M/D/YYYY",
          medium: "MMM D, YYYY",
          long: "MMMM D, YYYY",
          full: "dddd, MMMM D, YYYY",
        },
        time: {
          shortest: "h:mm A",
          short: "hh:mm A",
          medium: "hh:mm A",
          long: "hh:mm:ss A",
          full: "hh:mm:ss A",
        },
      },
      zh: {
        merge: "at",
        date: {
          shortest: "M/D/YY",
          short: "M/D/YYYY",
          medium: "MMM D, YYYY",
          long: "MMMM D, YYYY",
          full: "dddd, MMMM D, YYYY",
        },
        time: {
          shortest: "h:mm A",
          short: "hh:mm A",
          medium: "hh:mm A",
          long: "hh:mm:ss A",
          full: "hh:mm:ss A",
        },
      },
    };
    if (date) {
      return (
        (dateStyle !== null
          ? dayjs(date)
              .locale("th")
              .format(dateTimeFormat["th"].date[dateStyle || "medium"])
          : "") +
        (timeStyle
          ? ` ${dateTimeFormat["th"].merge} ${dayjs(date)
              .locale("th")
              .format(dateTimeFormat["th"].time[timeStyle])}`
          : "")
      );
    } else {
      return (
        (dateStyle
          ? dayjs()
              .locale("th")
              .format(dateTimeFormat["th"].date[dateStyle || "medium"])
          : "") +
        (timeStyle
          ? ` ${dateTimeFormat["th"].merge} ${dayjs()
              .locale("th")
              .format(dateTimeFormat["th"].time[timeStyle])}`
          : "")
      );
    }
  },
  age: (dateOfBirth: Date) => {
    return dayjs().diff(dateOfBirth, "years");
  },
  format: (date: Date, format?: string) => {
    return dayjs(date).format(format);
  },
};
