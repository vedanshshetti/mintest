type CBType = () => {
  res: boolean;
  metadata?: any;
  [key: string]: any;
};

function oTr(cb: CBType) {
  const r = cb();
  if (r.res) console.log("orTrue(...) passed.");
  else console.error("orTrue(...) failed.");
  return { orTrue: oTr, orFalse: oFls, end };
}

function oFls(cb: CBType) {
  const r = cb();
  if (!r.res) console.log("orFalse(...) passed.");
  else console.error("orFalse(...) failed.");
  return { orTrue: oTr, orFalse: oFls, end };
}

function end() {
  console.log("Test finished.");
}

class TestSuite {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  public whereTrue(cb: CBType) {
    const r = cb();
    if (r.res) console.log("whereTrue(...) passed!");
    else console.error("whereTrue(...) failed.");

    return {
      prevMetadata: r.metadata,
      orTrue: oTr,
      orFalse: oFls,
      end
    };
  }

  public whereFalse(cb: CBType) {
    const r = cb();
    if (!r.res) console.log("whereFalse(...) passed!");
    else console.error("whereFalse(...) failed. ERR_WHEREFALSE_FAILED");

    return {
      prevReturn: r,
      orTrue: oTr,
      orFalse: oFls,
      end
    };
  }
}

export default function test(name: string) {
  console.log(`Starting test "${name}":`);
  return new TestSuite(name);
}
