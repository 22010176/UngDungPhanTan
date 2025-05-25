namespace StorageServices.Utils;

public static class PathUtils
{
  public static string FixFolderPath(string path)
  {
    if (path.Length == 0) return path;

    string temp = path.Replace("\\", "/");
    return temp.TrimEnd('/') + "/";
  }
}