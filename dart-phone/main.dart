void main() {
  // Contoh teks input
  String teks = "Nomor handphone saya: +62-123-456-7890.";

  // Pola regex untuk nomor handphone
  RegExp polaRegex = RegExp(r'(\+62|62|0)8[1-9][0-9]{6,9}');

  // Mencari semua kecocokan dengan pola regex dalam teks
  Iterable<RegExpMatch> kecocokan = polaRegex.allMatches(teks);

  // Mengambil nomor handphone dari setiap kecocokan
  List<String?> nomorHandphone = [];
  for (var match in kecocokan) {
    String? nomor = match.group(0); // Mengambil seluruh kecocokan
    nomor = nomor?.replaceAll(RegExp(r'[^\d+]'), ''); // Menghapus karakter yang tidak diperlukan
    nomorHandphone.add(nomor);
  }

  // Menggabungkan nomor handphone menjadi satu string
  String nomorHandphoneString = nomorHandphone.join(", ");

  print(nomorHandphoneString);
}