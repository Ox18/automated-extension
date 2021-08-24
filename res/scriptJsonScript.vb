  Dim fs As Object
    Dim jsonfile
    Dim rangetoexport As Range
    Dim rowcounter As Long
    Dim columncounter As Long
    Dim linedata As String
    
    ' change range here
    Set rangetoexport = Sheets("Nombre de la hoja").Range("A#numberOfRows:F1")
    
    Set fs = CreateObject("Scripting.FileSystemObject")
    ' change dir here
    
    Set jsonfile = fs.CreateTextFile("C:\Users\#nameofuser\Desktop\" & "jsondata.txt", True)
    
    linedata = "{""Output"": ["
    jsonfile.WriteLine linedata
    For rowcounter = 2 To rangetoexport.Rows.Count
        linedata = ""
        For columncounter = 1 To rangetoexport.Columns.Count
            linedata = linedata & """" & rangetoexport.Cells(1, columncounter) & """" & ":" & """" & rangetoexport.Cells(rowcounter, columncounter) & """" & ","
        Next
        linedata = Left(linedata, Len(linedata) - 1)
        If rowcounter = rangetoexport.Rows.Count Then
            linedata = "{" & linedata & "}"
        Else
            linedata = "{" & linedata & "},"
        End If
        
        jsonfile.WriteLine linedata
    Next
    linedata = "]}"
    jsonfile.WriteLine linedata
    jsonfile.Close
    
    Set fs = Nothing
    
