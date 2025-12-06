namespace Day2;

public struct Range
{
    public long start;
    public long end;
}

public class Solve1
{
    long password = 0;
    
    public void solve()
    {
        string line = File.ReadAllText("day2/input.txt");
        Range[] ranges = parseRanges(line).ToArray();

        foreach (Range range in ranges)
        {
            for (long id = range.start; id <= range.end; id++)
            {
                string idStr = id.ToString();
                if (idStr.Length % 2 != 0) continue; // invalid ids must be even length

                int i = 0; 
                int half = idStr.Length / 2; 

                while (i < half)
                {
                    // compare val at i and i + halfLen 
                    if (idStr[i] != idStr[i + half]) break;
                    i += 1;
                }
                if (i == half) password += id; // each half matches: this is an invalid id
            }
        }

        Console.WriteLine($"Password: {password}");
    }

    private IEnumerable<Range> parseRanges(string line)
    {
        List<Range> parsedRanges = new List<Range>();

        string[] ranges = line.Split(',');
        foreach (string range in ranges)
        {
            string[] parts = range.Split('-');
            Range newRange = new Range
            {
                start = long.Parse(parts[0]),
                end = long.Parse(parts[1])  
            };
            parsedRanges.Add(newRange);
        }
        return parsedRanges;
    }
}