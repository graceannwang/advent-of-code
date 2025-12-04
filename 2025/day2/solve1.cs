namespace Day2;

public struct Range
{
    public int start;
    public int end;
}

public class Solve1
{
    public void solve()
    {
        string line = File.ReadAllText("day2/input.txt");
        Range[] ranges = parseRanges(line).ToArray();

        
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
                start = int.Parse(parts[0]),
                end = int.Parse(parts[1])  
            };
            parsedRanges.Add(newRange);
        }
        return parsedRanges;
    }
}