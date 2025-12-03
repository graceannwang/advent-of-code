int tick = 50;
int password = 0;

Console.WriteLine("Enter the puzzle input path:");
string filePath = Console.ReadLine();
string[] lines = File.ReadAllLines($"{filePath}");

foreach (string line in lines)
{
    int delta = getDelta(line);
    int result = tick + delta; 
    Console.WriteLine($"Delta: {delta}, Result: {result}");

    if (result < 0) 
        tick = 100 + result;
    else if (result > 99)
        tick = result - 100;
    else 
        tick = result;
    
    if (tick == 0)
        password += 1;
    
    Console.WriteLine($"New tick: {tick}");
}

Console.WriteLine(password);

int getDelta(string rotation)
{
    string dir = rotation.Substring(0, 1);
    int distance = int.Parse(rotation.Substring(1)) % 100;

    if (dir == "L") return -1 * distance; 
    else return distance;
}

