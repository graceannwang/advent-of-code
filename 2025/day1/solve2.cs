namespace Day1;
class Solve2
{
    int tick = 50;
    int password = 0;

    void solve()
    {
        string[] lines = File.ReadAllLines($"day1/input.txt");

        string outPath = "out.txt";
        using (StreamWriter writer = new StreamWriter(outPath))
        {
            foreach (string line in lines)
            {
                (int rem, int hits) = getRemainder(line);
                password += hits; // we've already hit 0 this many times
                writer.WriteLine("-----------------");
                writer.WriteLine($"tick: {tick}");
                writer.WriteLine($"line: {line}, remainder: {rem}, hits: {hits}");

                // in last turn, do we hit 0 again?
                int result = tick + rem; 
                writer.WriteLine($"result (tick + rem): {result}");

                updatePassword(tick, result);
                updateTick(result);

                writer.WriteLine($"password: {password}");
            }
        }
        Console.WriteLine(password);
    }

    void updatePassword(int tick, int result) 
    {
        if (result == 0) password += 1; // land on 0 
        else if (tick > 0 && result < 0) // leftward pass of 0
            password += 1;
        else if (tick < 100 && result >= 100) // rightward pass or land on 0
            password += 1;
    }

    void updateTick(int result) 
    {
        if (result < 0) 
            tick = 100 + result;
        else if (result > 99)
            tick = result - 99 - 1; // -1 because we start the count at 0
        else 
            tick = result;
    }

    (int delta, int hits) getRemainder(string rotation)
    {
        string dir = rotation.Substring(0, 1);
        int distance = int.Parse(rotation.Substring(1));
        int rem = distance % 100;
        
        // figure out what multiple of 100
        int m = (distance - rem) / 100;
        if (tick == 0 && rem == 0)
            m -= 1; // in this scenario, tick already lands on 0, don't want to over-count by 1

        // figure out remaining steps to take
        if (dir == "L")  
            rem = -1 * rem; 
        
        return (rem, m);
    }
}


