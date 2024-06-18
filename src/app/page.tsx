import WeightEntryForm from '../components/WeightEntryForm';
import WeightList from '../components/WeightList';

export default function Home() {
  const userId = 1; // Oletetaan, että käyttäjän ID on 1

  return (
    <div>
      <h1>Weight Tracker</h1>
      <WeightEntryForm />
      <WeightList userId={userId} />
    </div>
  );
}
