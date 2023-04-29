import path from "path";
export function addDiv(markdown: string, options: any) {
  const a = options.skipdiv
    ? markdown
    : '<div class="content-section">\n<div class="section-container" markdown="1">\n' +
      markdown +
      "</div>\n</div>";
  return a;
}

type arrayTypeHash = {
  array: any[];
  keyProperty: string;
  valueProperty?: string;
  hashProperty?: string;
};
export function arrayToHash({ array, keyProperty }: arrayTypeHash) {
  const hash = {} as any;
  array.forEach((item) => {
    const key = item[keyProperty];
    hash[key] = item;
  });
  return hash;
}

export function getRoot() {
  let root = process.argv[1];
  root = root.substring(0, root.lastIndexOf("/gdocs2md")) + "/gdocs2md";
  return root;
}

export const normalizeElement: any = (element: any) => {
  if (element.type && element.value) {
    return { [element.type]: normalizeElement(element.value) };
  }

  if (Array.isArray(element)) {
    return element.map(normalizeElement);
  }

  return element;
};

export function getPluginOptions({
  folderid,
  root,
  subdir,
  suffix,
  saveGdoc,
  savemarkdowntofile,
  savemarkdowntogithub,
}: any) {
  return {
    folder: folderid,
    outputdir: path.join(root || "", subdir || ""),
    suffix: suffix,
    extension: "md",
    saveGdoc,
    savemarkdowntofile,
    savemarkdowntogithub,
  };
}

export function setOptionsFromArgs(options: any, args: string[]) {
  for (let x = 0; x < args.length; x++) {
    const value = args[x];
    let option = _getOptionName(value);
    if (option) {
      x++;
      let argValue: string | boolean = args[x];
      argValue =
        argValue === "true" ? true : argValue === "false" ? false : argValue;
      options[option] = argValue;
    }
  }
}
function _getOptionName(value: string) {
  let option = "";
  if (value && value.startsWith("--")) {
    option = value.substring(2);
  } else if (value && value.startsWith("-")) {
    option = value.substring(1);
  }
  return option;
}

export function getOutputdir(args: string[]) {
  const index = args.indexOf("--outputdir");
  let outputdir = "";
  if (index > -1) {
    outputdir = args[index + 1];
  } else if (index < 0 && args[0] && !args[0].startsWith("--")) {
    console.log("debug1", args[0], args[0].startsWith("--"));
    outputdir = args[0];
    args.splice(0, 1);
  } else {
    outputdir = process.env.WEBSITE_LOCAL_ROOT || "";
  }

  if (!outputdir) {
    throw new Error("No output directory specified");
  }
  if (outputdir.startsWith("/")) {
    outputdir = outputdir.substring(1);
  }
  return outputdir;
}
