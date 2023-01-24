function getPetsByAgeRange(pets, ageRangeStart, ageRangeEnd) {
    const start = ageRangeStart.split(" ");
    const startYears = parseInt(start[0]);
    const startMonths = parseInt(start[3]);
    const end = ageRangeEnd.split(" ");
    const endYears = parseInt(end[0]);
    const endMonths = parseInt(end[3]);
    const now = new Date();
    const validPets = [];
    for (let i = 0; i < pets.length; i++) {
      const birthdate = new Date(pets[i].birthday);
      const diff = now - birthdate;
      const ageInMilliseconds = diff;
      const ageInSeconds = ageInMilliseconds / 1000;
      const ageInMinutes = ageInSeconds / 60;
      const ageInHours = ageInMinutes / 60;
      const ageInDays = ageInHours / 24;
      const ageInMonths = ageInDays / 30.44;
      const ageInYears = ageInMonths / 12;
      const years = Math.floor(ageInYears);
      const months = Math.floor(ageInMonths - (years * 12));
      if (years >= startYears && years <= endYears &&
         months >= startMonths && months <= endMonths) {

        validPets.push(pets[i]);
      }
    }
    return validPets;
  }
  
  const pets = [
    { name: "Fido", birthday: "2015-05-01T22:24:25.975Z" },
    { name: "Whiskers", birthday: "2022-03-01T22:24:25.975Z" },
    { name: "Buddy", birthday: "2013-07-01T22:24:25.975Z" },
    { name: "Charlie", birthday: "2010-01-01T22:24:25.975Z" },
    { name: "Max", birthday: "2012-06-01T22:24:25.975Z" }
  ];
  
  function calculatePetAge(birthdate) {
    const birth = new Date(birthdate);
    const now = new Date();
    const diff = now - birth;
    const ageInMilliseconds = diff;
    const ageInSeconds = ageInMilliseconds / 1000;
    const ageInMinutes = ageInSeconds / 60;
    const ageInHours = ageInMinutes / 60;
    const ageInDays = ageInHours / 24;
    const ageInMonths = ageInDays / 30.44;
    const ageInYears = ageInMonths / 12;
    const years = Math.floor(ageInYears);
    const months = Math.floor(ageInMonths - (years * 12));
    return `${years} years and ${months} months`;
  }
  
