# Tomar screenshots de las páginas del portafolio
# Ejecutar: .\take-screenshots.ps1

$sites = @(
    @{ Name = "gm-fire"; Url = "https://gmfireservice.com/"; Width = 1400; Height = 900 },
    @{ Name = "dc-beauty"; Url = "https://dc-beauty.netlify.app/"; Width = 1400; Height = 900 },
    @{ Name = "casa-blanca"; Url = "https://danieldaar.github.io/Casa-Blanca/"; Width = 1400; Height = 900 },
    @{ Name = "vitalerect"; Url = "https://danieldaar.github.io/VitalErect/"; Width = 1400; Height = 900 }
)

$outputPath = "C:\Users\espec\OneDrive\Desktop\DSW-Software\img\projects"

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

foreach ($site in $sites) {
    Write-Host "Capturando $($site.Name)..."
    
    try {
        $browser = New-Object -ComObject InternetExplorer.Application
        $browser.Visible = $false
        $browser.Width = $site.Width
        $browser.Height = $site.Height
        $browser.Navigate($site.Url)
        
        # Esperar a que cargue
        Start-Sleep -Seconds 5
        
        # Tomar screenshot
        $bitmap = New-Object System.Drawing.Bitmap($site.Width, $site.Height)
        $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
        $graphics.CopyFromScreen($browser.Left, $browser.Top, 0, 0, $site.Size)
        
        $outputFile = Join-Path $outputPath "$($site.Name).png"
        $bitmap.Save($outputFile, [System.Drawing.Imaging.ImageFormat]::Png)
        
        $graphics.Dispose()
        $bitmap.Dispose()
        $browser.Quit()
        
        Write-Host "  Guardado: $outputFile"
    }
    catch {
        Write-Host "  Error: $_"
    }
}

Write-Host "`nScreenshots completados!"
Write-Host "Abre la carpeta: $outputPath"
