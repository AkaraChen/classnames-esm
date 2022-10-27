const hasOwn = {}.hasOwnProperty;

export default function classNames() {
  let classes: string[] = [];
  const args = Array.from(arguments);

  for (const arg in args) {
    if (!arg) continue;

    const argType = typeof arg;

    if (argType === "string") {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      if (arg.length) {
        const inner = classNames.apply(null, arg);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (argType === "object") {
      if (
        arg.toString !== Object.prototype.toString &&
        !arg.toString.toString().includes("[native code]")
      ) {
        classes.push(arg.toString());
        continue;
      }

      for (const key in arg) {
        if (hasOwn.call(arg, key) && arg[key]) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(" ");
}
