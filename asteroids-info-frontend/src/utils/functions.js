const asteroidsSort = (asteroidsByDate) => {
  const asteroidsSortDate = asteroidsByDate.sort((a, b) =>
    new Date(a.date).getTime() < new Date(b.date).getTime()
      ? -1
      : new Date(a.date).getTime() > new Date(b.date).getTime()
      ? 1
      : 0
  );
  return asteroidsSortDate.map((a) => {
    return {
      date: a.date,
      asteroids: a.asteroids.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
    };
  });
};

export default asteroidsSort;
