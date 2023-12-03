export function definePasswordStrength(value: string) {
  let strength = { color: "darkred", fullness: "5%" };

  if (value) {
    let validConditions = 0;
    const lower = /[a-z]/;
    const upper = /[A-Z]/;
    const number = /[0-9]/;
    const special = /[@$!%*?&()_+\-=\[\]{};]/;
    const conditions = [lower, upper, number, special];
    conditions.forEach((condition) =>
      condition.test(value) ? validConditions++ : null,
    );
    switch (validConditions) {
      case 1:
        strength = { color: "darkred", fullness: "25%" };
        break;
      case 2:
        strength = { color: "darkorange", fullness: "50%" };
        break;
      case 3:
        strength = { color: "darkgoldenrod", fullness: "75%" };
        break;
      case 4:
        strength = { color: "darkgreen", fullness: "100%" };
    }
  }

  return strength;
}

export const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
