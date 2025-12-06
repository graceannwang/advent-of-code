namespace Day2;

public class Solve2
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

                for (int segLen = 1; segLen <= idStr.Length / 2; segLen++)
                {
                    if (idStr.Length % segLen != 0) continue; 
                    int m = idStr.Length / segLen; // get the multiple
                    string seg = idStr.Substring(0, segLen); 

                    // checks all segments equal our seg 
                    int i;
                    for(i = 0; i < m; i++)
                    {
                        string segToCompare = idStr.Substring(i*segLen, segLen);
                        if (segToCompare != seg) break;
                    }
                    if (i == m)
                    {
                        password += id;
                        break;
                    } 
                }
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